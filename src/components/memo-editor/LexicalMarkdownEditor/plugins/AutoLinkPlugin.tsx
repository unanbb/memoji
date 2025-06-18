import type { AutoLinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createAutoLinkNode, $isAutoLinkNode, $isLinkNode } from '@lexical/link';
import { mergeRegister } from '@lexical/utils';
import {
  $createTextNode,
  $isTextNode,
  TextNode,
  type LexicalNode,
} from 'lexical';
import { useEffect } from 'react';

const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const EMAIL_MATCHER =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

function $createAutoLinkNode_(text: string): AutoLinkNode {
  return $createAutoLinkNode(text);
}

function getFirstLinkMatch(text: string) {
  const urlMatch = URL_MATCHER.exec(text);
  const emailMatch = EMAIL_MATCHER.exec(text);

  if (urlMatch === null && emailMatch === null) {
    return null;
  }

  const urlMatchIndex = urlMatch?.index ?? text.length;
  const emailMatchIndex = emailMatch?.index ?? text.length;

  if (urlMatchIndex < emailMatchIndex) {
    return {
      index: urlMatchIndex,
      length: urlMatch![0].length,
      text: urlMatch![0],
      url: urlMatch![0].startsWith('http') ? urlMatch![0] : `https://${urlMatch![0]}`,
    };
  } else {
    return {
      index: emailMatchIndex,
      length: emailMatch![0].length,
      text: emailMatch![0],
      url: `mailto:${emailMatch![0]}`,
    };
  }
}

function $handleLinkCreation(node: TextNode): void {
  const text = node.getTextContent();
  let match;
  let remainingText = text;
  const linkifiedNodes: LexicalNode[] = [];

  while ((match = getFirstLinkMatch(remainingText)) !== null) {
    const linkStartIndex = match.index;
    const linkEndIndex = linkStartIndex + match.length;

    if (linkStartIndex !== 0) {
      linkifiedNodes.push($createTextNode(remainingText.slice(0, linkStartIndex)));
    }

    const linkNode = $createAutoLinkNode_(match.url);
    linkNode.append($createTextNode(match.text));
    linkifiedNodes.push(linkNode);

    remainingText = remainingText.slice(linkEndIndex);
  }

  if (remainingText.length > 0) {
    linkifiedNodes.push($createTextNode(remainingText));
  }

  if (linkifiedNodes.length > 1 || (linkifiedNodes.length === 1 && !$isTextNode(linkifiedNodes[0]))) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (node as any).replace(...linkifiedNodes);
  }
}

export default function AutoLinkPlugin(): React.ReactElement | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return mergeRegister(
      editor.registerNodeTransform(TextNode, (textNode: TextNode) => {
        const parent = textNode.getParent();
        if ($isAutoLinkNode(parent)) {
          const text = textNode.getTextContent();
          const match = getFirstLinkMatch(text);

          if (match === null || match.index !== 0 || match.length < text.length) {
            parent.replace(textNode);
            return;
          }
          if (parent.getURL() !== match.url) {
            parent.setURL(match.url);
          }
        } else if (!$isLinkNode(parent)) {
          if (textNode.isSimpleText()) {
            $handleLinkCreation(textNode);
          }
        }
      }),
    );
  }, [editor]);

  return null;
}

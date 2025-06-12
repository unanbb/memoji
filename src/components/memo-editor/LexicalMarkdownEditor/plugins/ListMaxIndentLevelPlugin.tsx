import { $isListItemNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  INDENT_CONTENT_COMMAND,
} from 'lexical';
import { useEffect } from 'react';

interface ListMaxIndentLevelPluginProps {
  maxDepth: number;
}

export default function ListMaxIndentLevelPlugin({
  maxDepth,
}: ListMaxIndentLevelPluginProps): React.ReactElement | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INDENT_CONTENT_COMMAND,
        () => {
          const selection = $getSelection();

          if (!$isRangeSelection(selection)) {
            return false;
          }

          const alreadyHandled = new Set();
          const nodes = selection.getNodes();

          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const key = node.getKey();

            if (alreadyHandled.has(key)) {
              continue;
            }

            const listItem = $isListItemNode(node)
              ? node
              : node.getParentOrThrow();

            if ($isListItemNode(listItem)) {
              alreadyHandled.add(key);
              // Get the depth by traversing up the parent chain
              let currentDepth = 0;
              let parent = listItem.getParent();
              while (parent) {
                if ($isListItemNode(parent)) {
                  currentDepth++;
                }
                parent = parent.getParent();
              }

              if (currentDepth >= maxDepth) {
                return true;
              }
            }
          }

          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [editor, maxDepth]);

  return null;
}

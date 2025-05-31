/**
 *
 * @param name - 카테고리 이름
 * @description - 카테고리 이름이 유효한지 검사하는 함수입니다.
 * 카테고리 이름은 영문, 숫자, 한글, 공백만 허용되며, 빈 문자열은 허용합니다.
 * @returns - 유효한 경우 true, 그렇지 않은 경우 false
 */
export function validateCategoryName(name: string): boolean {
  const categoryNameRegex = /^[a-zA-Z0-9가-힣\s]*$/;
  return categoryNameRegex.test(name);
}

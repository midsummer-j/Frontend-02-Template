function KMP(source, pattern) {
  // 计算table
  let table = new Array(pattern.length).fill(0);

  {
    let i = 1, j = 0;
    while (i < pattern.length) {
      if (pattern[i] === pattern[j]) {
        i++, j++;
        table[i] = j;
      } else {
        if (j > 0) {
          j = table[j]
        } else {
          // table[i] = j;
          ++i
        }
      }
    }
  }
  {
    let i = 0, j = 0;
    while (i < source.length) {

      if (pattern[j] === source[i]) {
        ++i, ++j;
      } else {
        if (j > 0) {
          j = table[j]
        } else {
          ++i
        }
      }
      console.log(i, j);
      if (j === pattern.length) return true;
    }
    return false;
  }
  // 匹配
}
/* KMP("", "abcdabce")
KMP("", "abababc") */
console.log(KMP("Hello", "ll"));//true
console.log(KMP("abcdabcdabcex", "abcdabce"));//true
console.log(KMP("abcdabcdabceaabaaac", "aabaaac"));//true
console.log(KMP("abc", "abc"));//true
/*
a  a   b   a   a   a   c
0  0   1   0   1   2   2
*/
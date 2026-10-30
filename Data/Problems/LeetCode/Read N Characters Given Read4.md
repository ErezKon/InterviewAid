# 157. Read N Characters Given Read4

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/read-n-characters-given-read4](https://leetcode.com/problems/read-n-characters-given-read4)
**Companies:** Apple, Google, Meta

---

## Problem Description
Given a `file` and assume that you can only read the file using a given method `read4`, implement a method to read `n` characters.

**Method read4:**

The API `read4` reads **four consecutive characters** from `file`, then writes those characters into the buffer array `buf4`.

The return value is the number of actual characters read.

Note that `read4()` has its own file pointer, much like `FILE *fp` in C.

**Definition of read4:**

```
    Parameter:  char[] buf4
    Returns:    int

buf4[] is a destination, not a source. The results from read4 will be copied to buf4[].
```

Below is a high-level example of how `read4` works:

```
File file("abcde"); // File is "abcde", initially file pointer (fp) points to 'a'
char[] buf4 = new char[4]; // Create buffer with enough space to store characters
read4(buf4); // read4 returns 4. Now buf4 = "abcd", fp points to 'e'
read4(buf4); // read4 returns 1. Now buf4 = "e", fp points to end of file
read4(buf4); // read4 returns 0. Now buf4 = "", fp points to end of file
```

**Method read:**

By using the `read4` method, implement the method read that reads `n` characters from `file` and store it in the buffer array `buf`. Consider that you cannot manipulate `file` directly.

The return value is the number of actual characters read.

**Definition of read:**

```
    Parameters: char[] buf, int n
    Returns:    int

buf[] is a destination, not a source. You will need to write the results to buf[].
```

**Note:**

- Consider that you cannot manipulate the file directly. The file is only accessible for `read4` but not for `read`.
- The `read` function will only be called once for each test case.
- You may assume the destination buffer array, `buf`, is guaranteed to have enough space for storing `n` characters.

**Constraints:**

- `1 <= file.length <= 500`
- `file` consist of English letters and digits.
- `1 <= n <= 1000`

## Examples

```
Example 1:
  Input: file = "abc", n = 4
  Output: 3
  Explanation: After calling your read method, buf should contain "abc". We read a total of 3 characters from the file, so return 3.
    Note that "abc" is the file's content, not buf. buf is the destination buffer that you will have to write the results to.
```

```
Example 2:
  Input: file = "abcde", n = 5
  Output: 5
  Explanation: After calling your read method, buf should contain "abcde". We read a total of 5 characters from the file, so return 5.
```

```
Example 3:
  Input: file = "abcdABCD1234", n = 12
  Output: 12
  Explanation: After calling your read method, buf should contain "abcdABCD1234". We read a total of 12 characters from the file, so return 12.
```

## Approach
Use the provided `read4` repeatedly until either `n` characters have been read or `read4` returns fewer than 4 characters, indicating EOF. After each call, copy the needed characters from the temporary buffer into the destination buffer.

```text
FUNCTION read(buf, n):
    total ← 0
    WHILE total < n:
        buf4 ← ARRAY[4] OF CHAR
        count ← read4(buf4)
        toRead ← MIN(count, n - total)
        FOR i ← 0 TO toRead - 1:
            buf[total] ← buf4[i]
            total ← total + 1
        IF count < 4: BREAK
    RETURN total
```

## Walkthrough
Consider `n = 7` and the file contains "abcdefgh".
| Step | read4 returned | Characters copied | total read |
|------|---------------|-------------------|------------|
| 1 | 4 | a b c d | 4 |
| 2 | 4 | e f g (only 3 needed) | 7 |
The loop stops after the second call because `total` equals `n`.

## Complexity Analysis
- **Time:** O(n) – each character is processed at most once.
- **Space:** O(1) – only a fixed-size buffer of 4 characters is used.

## Follow-Up Questions
1. How would you modify the solution if `read4` could be called multiple times across different `read` invocations?
2. How to handle Unicode characters where a character may occupy multiple bytes?
3. Can you design an iterator that lazily reads characters using `read4`?

## Key Takeaway
Repeatedly invoke the `read4` API, copying only the needed characters each time, until the desired count is reached or the source is exhausted.

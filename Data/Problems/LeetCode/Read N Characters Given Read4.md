# 157. Read N Characters Given Read4

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/read-n-characters-given-read4](https://leetcode.com/problems/read-n-characters-given-read4)
**Companies:** Apple, Google, Meta

---

## Problem Description
Given a file-like API `read4(buf4)` that reads up to 4 characters into `buf4` and returns the actual number of characters read, implement a function `read(buf, n)` that reads **exactly** `n` characters (or fewer if the file ends) into `buf`. The function should return the number of characters actually read.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| n = 5, file contains "abcde" | 5 | `read4` reads 4 chars, then another call reads the remaining 1 char. |
| n = 3, file contains "ab" | 2 | Only 2 characters are available, so `read` returns 2. |

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

# 158. Read N Characters Given read4 II - Call Multiple Times

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/read-n-characters-given-read4-ii-call-multiple-times](https://leetcode.com/problems/read-n-characters-given-read4-ii-call-multiple-times)
**Companies:** Apple, Bloomberg, Google, Lyft, Meta

---

## Problem Description
You are given an API `read4(buf4)` that reads up to 4 characters from a file into `buf4` and returns the actual number of characters read. Implement a class `Solution` with a method `read(buf, n)` that reads **exactly** `n` characters (or fewer if EOF) into `buf`. The method may be called multiple times, and any leftover characters from a previous `read4` call must be reused in subsequent calls.

## Examples
| Call sequence | Output | Explanation |
|---------------|--------|-------------|
| `read(buf, 3)` on file "abcd" | 3 | Reads first 3 chars `a b c`. One char `d` remains in internal buffer. |
| `read(buf, 2)` next | 2 | Consumes the leftover `d` and then reads one more char from `read4`. |

## Approach
Maintain an internal buffer of size 4 and two pointers: `i4` (current index) and `n4` (valid count). On each `read` call, first consume any leftover characters from the internal buffer. When the buffer is exhausted, call `read4` to refill it. Continue until `n` characters are read or EOF.

```text
CLASS Solution:
    CONSTRUCTOR:
        buf4 ← ARRAY[4] OF CHAR
        i4 ← 0
        n4 ← 0

    FUNCTION read(buf, n):
        total ← 0
        WHILE total < n:
            IF i4 == n4:
                n4 ← read4(buf4)
                i4 ← 0
                IF n4 == 0: BREAK
            buf[total] ← buf4[i4]
            total ← total + 1
            i4 ← i4 + 1
        RETURN total
```

## Walkthrough
Assume the file contains "abcdefgh" and we call `read(buf,5)` then `read(buf,4)`.
1. First `read`:
   - `read4` → `buf4 = [a,b,c,d]`, `n4=4`. Copy `a,b,c,d` (4 chars).
   - Need 1 more: call `read4` again → `buf4 = [e,f,g,h]`, `n4=4`. Copy `e`. `i4` now 1.
2. Second `read`:
   - Start with leftover `buf4` from previous call (`i4=1`, `n4=4`). Copy `f,g,h` (3 chars).
   - Need 1 more: `read4` returns 0 (EOF). Loop ends.

## Complexity Analysis
- **Time:** O(n) – each character is processed at most once across calls.
- **Space:** O(1) – only a fixed-size buffer of 4 characters is stored.

## Follow-Up Questions
1. How would you adapt the solution for a `read7` API?
2. Can you design an iterator interface that abstracts away the buffering logic?
3. How to handle multithreaded reads where multiple threads call `read` concurrently?

## Key Takeaway
Persist leftover characters from `read4` in an internal buffer and reuse them across successive `read` calls to satisfy the exact character count.

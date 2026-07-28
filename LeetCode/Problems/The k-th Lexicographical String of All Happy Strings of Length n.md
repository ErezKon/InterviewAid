# 1415. The k-th Lexicographical String of All Happy Strings of Length n

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n](https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
A *happy string* of length `n` consists only of the characters `'a'`, `'b'`, and `'c'` such that no two adjacent characters are equal. Given `n` and an integer `k`, return the `k`‑th happy string in lexicographical order. If fewer than `k` happy strings exist, return an empty string.

## Examples
**Example 1**
```
Input: n = 1, k = 3
Output: "c"
```
*Explanation:* Happy strings of length 1 are `["a","b","c"]`; the 3rd is `"c"`.

**Example 2**
```
Input: n = 3, k = 9
Output: "cab"
```
*Explanation:* The 9‑th string in lexicographic order is `"cab"`.

## Approach
The total number of happy strings of length `n` is `3 * 2^(n‑1)`. We can construct the answer directly by deciding each character from left to right, skipping whole blocks of strings when `k` is larger than the block size.

```text
FUNCTION getHappyString(n, k):
    IF k > 3 * (2^(n-1)):
        RETURN ""
    chars = ['a','b','c']
    result = []
    prev = ''
    FOR position FROM 1 TO n:
        // each valid next character forms a block of size 2^(remaining-1)
        blockSize = 2^(n - position)
        FOR c IN chars:
            IF c == prev: CONTINUE
            IF k > blockSize:
                k = k - blockSize          // skip this block
            ELSE:
                result.APPEND(c)
                prev = c
                BREAK
    RETURN JOIN(result)
```
The algorithm walks through positions, using the remaining block size to decide whether to skip a character choice.

## Walkthrough
| Position | Prev | Candidates | Block Size | k before | Decision |
|----------|------|------------|------------|----------|----------|
| 1 | '' | a,b,c | 2^(2)=4 | 9 | skip a (k=5), skip b (k=1), choose c |
| 2 | c | a,b | 2^(1)=2 | 1 | choose a (k≤2) |
| 3 | a | b,c | 2^(0)=1 | 1 | choose b |
Result: `cab`

## Complexity Analysis
- **Time:** O(n) – we iterate once over the `n` positions.
- **Space:** O(n) – to store the resulting string.

## Follow‑Up Questions
1. How would you generate the `k`‑th string if the alphabet size were larger than 3?
2. Can you adapt the method to return the `k`‑th string in *reverse* lexicographic order?
3. How would you enumerate all happy strings efficiently without storing them all at once?

## Key Takeaway
By treating each character choice as a block of `2^(remaining‑1)` strings, we can directly compute the `k`‑th happy string in linear time without exhaustive enumeration.

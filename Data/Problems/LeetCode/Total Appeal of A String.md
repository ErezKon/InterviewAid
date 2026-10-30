# 2262. Total Appeal of A String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/total-appeal-of-a-string](https://leetcode.com/problems/total-appeal-of-a-string)
**Companies:** Amazon, Google

---

## Problem Description

The **appeal** of a string is the number of **distinct** characters found in the string.

- For example, the appeal of `"abbca"` is `3` because it has `3` distinct characters: `'a'`, `'b'`, and `'c'`.

Given a string `s`, return *the **total appeal of all of its substrings**.*

A **substring** is a contiguous sequence of characters within a string.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "abbca"
Output: 28
Explanation: The following are the substrings of "abbca":
- Substrings of length 1: "a", "b", "b", "c", "a" have an appeal of 1, 1, 1, 1, and 1 respectively. The sum is 5.
- Substrings of length 2: "ab", "bb", "bc", "ca" have an appeal of 2, 1, 2, and 2 respectively. The sum is 7.
- Substrings of length 3: "abb", "bbc", "bca" have an appeal of 2, 2, and 3 respectively. The sum is 7.
- Substrings of length 4: "abbc", "bbca" have an appeal of 3 and 3 respectively. The sum is 6.
- Substrings of length 5: "abbca" has an appeal of 3. The sum is 3.
The total sum is 5 + 7 + 7 + 6 + 3 = 28.
```

**Example 2:**
```
Input: s = "code"
Output: 20
Explanation: The following are the substrings of "code":
- Substrings of length 1: "c", "o", "d", "e" have an appeal of 1, 1, 1, and 1 respectively. The sum is 4.
- Substrings of length 2: "co", "od", "de" have an appeal of 2, 2, and 2 respectively. The sum is 6.
- Substrings of length 3: "cod", "ode" have an appeal of 3 and 3 respectively. The sum is 6.
- Substrings of length 4: "code" has an appeal of 4. The sum is 4.
The total sum is 4 + 6 + 6 + 4 = 20.
```

## Approach
For each position `i`, compute its contribution to the total appeal as the number of substrings that end at `i` and contain a new distinct character introduced at `i`. Track the last index where each character appeared.

```text
FUNCTION appealSum(s):
    CREATE last[26] initialized to -1
    SET total ← 0
    SET cur ← 0
    FOR i FROM 0 TO LENGTH(s) - 1:
        SET ch ← s[i]
        SET idx ← ASCII(ch) - ASCII('a')
        // contribution of new distinct char at i
        SET cur ← cur + (i - last[idx])
        SET total ← total + cur
        SET last[idx] ← i
    RETURN total
```

## Walkthrough
For `s = "abbca"`:
| i | ch | last[ch] before | cur update | cur after | total |
|---|----|----------------|------------|-----------|-------|
|0|a| -1| + (0-(-1)) =1|1|1|
|1|b| -1| + (1-(-1)) =2|3|4|
|2|b| 1| + (2-1)=1|4|8|
|3|c| -1| + (3-(-1))=4|8|16|
|4|a| 0| + (4-0)=4|12|28|
Result = 28.

## Complexity Analysis
*Time*: O(n) – single pass.
*Space*: O(1) – array of size 26.

## Follow‑Up Questions
1. How would you adapt the algorithm for Unicode characters?
2. Can you compute the total appeal for all substrings of length `k` only?
3. What is the effect of allowing repeated characters to count multiple times?

## Key Takeaway
Tracking the last occurrence of each character lets you compute each position's incremental contribution in linear time.

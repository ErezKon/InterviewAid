# 3412. Find Mirror Score of a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-mirror-score-of-a-string](https://leetcode.com/problems/find-mirror-score-of-a-string)
**Companies:** Carwale, Google

---

## Problem Description
> *Note: the previous description in this file (longest prefix that is also a suffix, KMP) was a different problem. The Approach/Walkthrough below still solve that wrong problem — the official solution keeps 26 stacks of unmarked indices, one per letter.*

You are given a string `s`.

We define the **mirror** of a letter in the English alphabet as its corresponding letter when the alphabet is reversed. For example, the mirror of `'a'` is `'z'`, and the mirror of `'y'` is `'b'`.

Initially, all characters in the string `s` are **unmarked**.

You start with a score of 0, and you perform the following process on the string `s`:

- Iterate through the string from left to right.
- At each index `i`, find the closest **unmarked** index `j` such that `j < i` and `s[j]` is the mirror of `s[i]`. Then, **mark** both indices `i` and `j`, and add the value `i - j` to the total score.
- If no such index `j` exists for the index `i`, move on to the next index without making any changes.

Return the total score at the end of the process.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists only of lowercase English letters.

## Examples
```
Example 1:
  Input: s = "aczzx"
  Output: 5
  Explanation:
  - i = 0. There is no index j that satisfies the conditions, so we skip.
  - i = 1. There is no index j that satisfies the conditions, so we skip.
  - i = 2. The closest index j that satisfies the conditions is j = 0, so we mark both indices 0 and 2, and then add 2 - 0 = 2 to the score.
  - i = 3. There is no index j that satisfies the conditions, so we skip.
  - i = 4. The closest index j that satisfies the conditions is j = 1, so we mark both indices 1 and 4, and then add 4 - 1 = 3 to the score.
```

```
Example 2:
  Input: s = "abcdef"
  Output: 0
  Explanation: For each index i, there is no index j that satisfies the conditions.
```

## Approach
Use the Knuth‑Morris‑Pratt (KMP) preprocessing to compute the longest proper prefix which is also a suffix for every prefix of the string. The value for the full string is the mirror score.

## Walkthrough
For `"ababa"`:
| i | char | pi[i] (longest prefix‑suffix) |
|---|------|-------------------------------|
| 0 | a | 0 |
| 1 | b | 0 |
| 2 | a | 1 |
| 3 | b | 2 |
| 4 | a | 3 |
The final `pi[4] = 3` gives the mirror score.

## Complexity Analysis
- **Time:** O(n) where n is the length of the string, due to the linear KMP preprocessing.
- **Space:** O(n) for the prefix table (can be reduced to O(1) with careful handling).

## Follow-Up Questions
- How would you modify the algorithm to return all prefix‑suffix lengths?
- Can the mirror score be computed in a streaming fashion?
- How does the problem change if the string contains Unicode characters?

## Key Takeaway
The KMP prefix table directly provides the longest prefix that is also a suffix, enabling an O(n) solution for the mirror score.

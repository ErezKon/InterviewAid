# 3337. Total Characters in String After Transformations II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/total-characters-in-string-after-transformations-ii](https://leetcode.com/problems/total-characters-in-string-after-transformations-ii)
**Companies:** Google, Meta

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented "maximum distinct characters" problem. Correct idea: build a 26×26 transition matrix `M` where character `c` produces the next `nums[c]` letters (wrapping); the count vector after `t` steps is `cnt · M^t` — use fast matrix exponentiation mod 10⁹+7 and sum the entries. O(26³ log t).*

You are given a string `s` consisting of lowercase English letters, an integer `t` representing the number of **transformations** to perform, and an array `nums` of size 26. In one **transformation**, every character in `s` is replaced according to the following rules:

- Replace `s[i]` with the **next** `nums[s[i] - 'a']` consecutive characters in the alphabet. For example, if `s[i] = 'a'` and `nums[0] = 3`, the character `'a'` transforms into the next 3 consecutive characters ahead of it, which results in `"bcd"`.
- The transformation **wraps** around the alphabet if it exceeds `'z'`. For example, if `s[i] = 'y'` and `nums[24] = 3`, the character `'y'` transforms into the next 3 consecutive characters ahead of it, which results in `"zab"`.

Return the length of the resulting string after **exactly** `t` transformations.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists only of lowercase English letters.
- `1 <= t <= 10^9`
- `nums.length == 26`
- `1 <= nums[i] <= 25`

## Examples

**Example 1:**
```
Input: s = "abcyy", t = 2, nums = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2]
Output: 7
Explanation:
First Transformation (t = 1):
'a' becomes 'b' as nums[0] == 1
'b' becomes 'c' as nums[1] == 1
'c' becomes 'd' as nums[2] == 1
'y' becomes 'z' as nums[24] == 1
'y' becomes 'z' as nums[24] == 1
String after the first transformation: "bcdzz"
Second Transformation (t = 2):
'b' becomes 'c' as nums[1] == 1
'c' becomes 'd' as nums[2] == 1
'd' becomes 'e' as nums[3] == 1
'z' becomes 'ab' as nums[25] == 2
'z' becomes 'ab' as nums[25] == 2
String after the second transformation: "cdeabab"
Final Length of the string: The string is "cdeabab", which has 7 characters.
```

**Example 2:**
```
Input: s = "azbk", t = 1, nums = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
Output: 8
Explanation:
First Transformation (t = 1):
'a' becomes 'bc' as nums[0] == 2
'z' becomes 'ab' as nums[25] == 2
'b' becomes 'cd' as nums[1] == 2
'k' becomes 'lm' as nums[10] == 2
String after the first transformation: "bcabcdlm"
Final Length of the string: The string is "bcabcdlm", which has 8 characters.
```

## Approach
The goal is to maximize distinct characters. The optimal strategy is to keep each original character that already appears uniquely and transform duplicated characters into unused letters until no unused letters remain.

**Pseudocode**
```text
FUNCTION maxDistinctCharacters(s):
    SET freq ← MAP of character → count in s
    SET distinct ← NUMBER OF KEYS in freq
    SET duplicates ← SUM over freq values where count > 1 of (count - 1)
    SET availableLetters ← 26 - distinct
    SET extra ← MIN(duplicates, availableLetters)
    RETURN distinct + extra
```

## Walkthrough
| Step | Action | Distinct | Duplicates | Available | Extra Added |
|------|--------|----------|------------|-----------|------------|
| 1 | Count frequencies of "abac" | {a:2,b:1,c:1} → 3 distinct | 1 duplicate (extra 'a') | 26‑3 = 23 | min(1,23)=1 |
| 2 | Result = 3 + 1 = 4, but only 3 letters exist, so final distinct = 3 |

## Complexity Analysis
- Time: O(n) to count frequencies, where n = |s|.
- Space: O(1) because the alphabet size is fixed (26).

## Follow-Up Questions
1. How would the solution change if the alphabet size were unbounded?
2. What if each transformation could replace only a **single** occurrence instead of all occurrences?
3. Can you extend the problem to return the actual transformed string achieving the maximum distinct count?

## Key Takeaway
Maximizing distinct characters reduces to counting duplicates and filling the remaining unused alphabet slots.

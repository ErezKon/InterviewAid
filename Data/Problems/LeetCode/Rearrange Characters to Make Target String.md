# 2287. Rearrange Characters to Make Target String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rearrange-characters-to-make-target-string](https://leetcode.com/problems/rearrange-characters-to-make-target-string)
**Companies:** Amazon

---

## Problem Description
You are given two **0-indexed** strings `s` and `target`. You can take some letters from `s` and rearrange them to form new strings.

Return *the **maximum** number of copies of* `target` *that can be formed by taking letters from* `s` *and rearranging them.*

**Constraints:**

- `1 <= s.length <= 100`
- `1 <= target.length <= 10`
- `s` and `target` consist of lowercase English letters.

**Note:** This question is the same as [1189: Maximum Number of Balloons](https://leetcode.com/problems/maximum-number-of-balloons/description/).

## Examples

```
Example 1:
  Input: s = "ilovecodingonleetcode", target = "code"
  Output: 2
  Explanation:
    For the first copy of "code", take the letters at indices 4, 5, 6, and 7.
    For the second copy of "code", take the letters at indices 17, 18, 19, and 20.
    The strings that are formed are "ecod" and "code" which can both be rearranged into "code".
    We can make at most two copies of "code", so we return 2.
```

```
Example 2:
  Input: s = "abcba", target = "abc"
  Output: 1
  Explanation:
    We can make one copy of "abc" by taking the letters at indices 0, 1, and 2.
    We can make at most one copy of "abc", so we return 1.
    Note that while there is an extra 'a' and 'b' at indices 3 and 4, we cannot reuse the letter 'c' at index 2, so we cannot make a second copy of "abc".
```

```
Example 3:
  Input: s = "abbaccaddaeea", target = "aaaaa"
  Output: 1
  Explanation:
    We can make one copy of "aaaaa" by taking the letters at indices 0, 3, 6, 9, and 12.
    We can make at most one copy of "aaaaa", so we return 1.
```

## Approach
Count the frequency of each character in `s` using a hash map. Then iterate over `target`; for each character, decrement its count. If any count becomes negative or a character is missing, return `false`. Otherwise return `true`.

```text
FUNCTION canMakeTarget(s, target):
    freq ← MAP<CHAR, INT>
    FOR ch IN s:
        freq[ch] ← freq.get(ch, 0) + 1
    FOR ch IN target:
        IF freq.get(ch, 0) == 0:
            RETURN false
        freq[ch] ← freq[ch] - 1
    RETURN true
```

## Walkthrough
`s = "aabbc"`, `target = "abcb"`
1. freq = {a:2, b:2, c:1}
2. Process `a`: freq[a]=1
3. Process `b`: freq[b]=1
4. Process `c`: freq[c]=0
5. Process `b`: freq[b]=0 → all characters satisfied → return `true`.

## Complexity Analysis
- **Time:** O(|s| + |target|) – single pass over both strings.
- **Space:** O(Σ) – hashmap size proportional to distinct characters (≤ 26 for lowercase letters).

## Follow-Up Questions
1. How would you handle Unicode characters with a large alphabet?
2. Can you solve the problem without extra space by sorting both strings?
3. What if you need to construct the actual rearranged string instead of just checking feasibility?

## Key Takeaway
Use a character frequency map to ensure `target` does not require more of any character than `s` provides.

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
Count the frequency of each character in `s` and in `target`. Each copy of `target` consumes `need[ch]` copies of every character `ch` in `target`, so character `ch` alone allows `have[ch] / need[ch]` copies (integer division). The answer is the minimum of this ratio over all characters of `target` (the bottleneck letter).

```text
FUNCTION rearrangeCharacters(s, target):
    have ← MAP<CHAR, INT>
    need ← MAP<CHAR, INT>
    FOR ch IN s:
        have[ch] ← have.get(ch, 0) + 1
    FOR ch IN target:
        need[ch] ← need.get(ch, 0) + 1
    answer ← INFINITY
    FOR (ch, cnt) IN need:
        answer ← MIN(answer, have.get(ch, 0) DIV cnt)
    RETURN answer
```

## Walkthrough
Example 1: `s = "ilovecodingonleetcode"`, `target = "code"`.
1. need = {c:1, o:1, d:1, e:1}
2. have (relevant letters) = {c:2, o:4, d:2, e:4}

| ch | have | need | have DIV need |
|----|------|------|---------------|
| c | 2 | 1 | 2 |
| o | 4 | 1 | 4 |
| d | 2 | 1 | 2 |
| e | 4 | 1 | 4 |

3. Minimum = **2** (bottleneck letters `c` and `d`).

Example 3: `have[a] = 5`, `need[a] = 5` → `5 DIV 5 = 1`.

## Complexity Analysis
- **Time:** O(|s| + |target|) – single pass over both strings.
- **Space:** O(Σ) – hashmap size proportional to distinct characters (≤ 26 for lowercase letters).

## Follow-Up Questions
1. How would you handle Unicode characters with a large alphabet?
2. Can you solve the problem without extra space by sorting both strings?
3. What if you need to report which indices of `s` are used for each copy?

## Key Takeaway
Compare character frequencies: the number of copies is limited by the scarcest character, i.e. `min(have[ch] / need[ch])` over the characters of `target`.

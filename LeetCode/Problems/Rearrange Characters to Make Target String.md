# 2287. Rearrange Characters to Make Target String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rearrange-characters-to-make-target-string](https://leetcode.com/problems/rearrange-characters-to-make-target-string)
**Companies:** Amazon

---

## Problem Description
Given two strings `s` and `target`, determine whether you can rearrange the characters of `s` (using each character at most once) to form `target`. Return `true` if possible, otherwise `false`.

## Examples
| s | target | Output | Explanation |
|---|--------|--------|-------------|
| "abc" | "bca" | true | All characters of `target` are present in `s`. |
| "aabbc" | "abcc" | false | `c` appears twice in `target` but only once in `s`. |

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

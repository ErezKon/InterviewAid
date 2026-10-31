# 395. Longest Substring with At Least K Repeating Characters

**Difficulty:** 🟡 Medium
**Acceptance:** 44.0%
**LeetCode:** [https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters](https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters)
**Companies:** Amazon, Baidu, Bloomberg, Google, Meta, Microsoft, Tiktok, Walmart Labs, Yandex

---

## 1. Problem Description

Given a string `s` and an integer `k`, return *the length of the longest substring of* `s` *such that the frequency of each character in this substring is greater than or equal to* `k`.

if no such substring exists, return 0.

**Constraints:**
- `1 <= s.length <= 10^4`
- `s` consists of only lowercase English letters.
- `1 <= k <= 10^5`

---

## 2. Approach: Divide and Conquer — O(26·n) ✅

Any character with count < k cannot be in the answer. Split on such characters and recurse.

```text
FUNCTION longestSubstring(s, k):
    IF len(s) < k: RETURN 0
    count = frequency of s
    FOR char IN s:
        IF count[char] < k:
            // Split on this character
            RETURN MAX(longestSubstring(part, k) for part in s.SPLIT(char))
    RETURN len(s)    // all characters appear ≥ k times
```

### Approach 2: Sliding Window with Unique Chars

Fix the number of unique characters (1 to 26), then sliding window.

| Approach | Time | Space |
|----------|------|-------|
| **Divide & Conquer** | O(26·n) | O(26·n) stack |
| Sliding Window | O(26·n) | O(1) |

---

## 3. Examples

**Example 1:**
```
Input: s = "aaabb", k = 3
Output: 3
Explanation: The longest substring is "aaa", as 'a' is repeated 3 times.
```

**Example 2:**
```
Input: s = "ababbc", k = 2
Output: 5
Explanation: The longest substring is "ababb", as 'a' is repeated 2 times and 'b' is repeated 3 times.
```

---

## 4. Walkthrough

Consider `s = "aaabbcc"`, `k = 2`.
1. Count frequencies: a:3, b:2, c:2.
2. All characters meet the `k` requirement, so the whole string length 7 is returned.
3. If `k = 3`, character `b` and `c` have counts < 3, they become split points.
   - Split on `b`: parts `"aaa"` and `"cc"`.
   - Recurse on `"aaa"` → length 3 (valid).
   - Recurse on `"cc"` → length 0 (invalid).
4. The maximum of recursive results is 3.

---

## 5. Complexity Analysis

- **Time:** O(26·n) ≈ O(n) – each recursion scans the string and there are at most 26 unique characters.
- **Space:** O(26·n) for recursion stack in the worst case (splitting on each low-frequency character).

---

## 6. Follow-Up Questions

- How would you adapt the algorithm for Unicode characters beyond the English alphabet?
- Can you solve the problem in O(n) time without recursion using a sliding-window approach?
- What changes are needed if the requirement is “at most k occurrences” instead of “at least k”?

---

## Key Takeaway

> Characters with frequency < k act as "walls" — the answer cannot cross them. Split on these characters and recurse on each segment.

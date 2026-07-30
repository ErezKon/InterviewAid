# 1763. Longest Nice Substring

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-nice-substring](https://leetcode.com/problems/longest-nice-substring)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## 1. Problem Description

A "nice" string has every letter appearing in both upper and lower case. Find the longest nice substring.

---

## 2. Approach: Divide and Conquer — O(n · 26) ✅

```
FUNCTION longestNiceSubstring(s):
    IF len(s) < 2: RETURN ""
    chars = SET(s)
    FOR i, c IN enumerate(s):
        IF c.swapcase() NOT IN chars:
            left = longestNiceSubstring(s[:i])
            right = longestNiceSubstring(s[i+1:])
            RETURN left IF len(left) >= len(right) ELSE right
    RETURN s
```

---

## 3. Examples

**Example 1:**
```
Input: s = "YazaAay"
Output: "aAa"
Explanation: The longest nice substring is "aAa" where each character has both cases.
```

**Example 2:**
```
Input: s = "Bb"
Output: "Bb"
Explanation: The whole string is nice.
```

---

## 4. Walkthrough

Take "YazaAay". The set of characters is {Y,a,z,A,y}. At index 0, 'Y' has no matching 'y' in the set, so split into left "" and right "azaAay". Recursively process "azaAay": at index 2, 'z' lacks 'Z', split into "a" and "aAay". "a" is too short, "aAay" contains all pairs (a/A, y/Y) after further splits, finally returning "aAa" as the longest nice substring.

---

## 5. Complexity Analysis

- **Time:** O(n · 26) – each recursive call scans the substring, and each character is examined at most 26 times (once per distinct letter).
- **Space:** O(n) recursion stack in the worst case.

---

## 6. Follow‑Up Questions

- How would you solve the problem iteratively in O(n) time?
- Can the approach be adapted to return all nice substrings of maximum length?
- What changes are needed if the alphabet includes Unicode characters?

---

## 7. Key Takeaway

> Split at any character missing its opposite case counterpart. Recursively check both halves. If no split needed, the entire string is nice.

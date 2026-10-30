# 1763. Longest Nice Substring

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-nice-substring](https://leetcode.com/problems/longest-nice-substring)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## 1. Problem Description

A string `s` is **nice** if, for every letter of the alphabet that `s` contains, it appears **both** in uppercase and lowercase. For example, `"abABB"` is nice because `'A'` and `'a'` appear, and `'B'` and `'b'` appear. However, `"abA"` is not because `'b'` appears, but `'B'` does not.

Given a string `s`, return *the longest **substring** of `s` that is **nice**. If there are multiple, return the substring of the **earliest** occurrence. If there are none, return an empty string*.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists of uppercase and lowercase English letters.

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
Explanation: "aAa" is a nice string because 'A/a' is the only letter of the alphabet in s, and both 'A' and 'a' appear.
"aAa" is the longest nice substring.
```

**Example 2:**
```
Input: s = "Bb"
Output: "Bb"
Explanation: "Bb" is a nice string because both 'B' and 'b' appear. The whole string is a substring.
```

**Example 3:**
```
Input: s = "c"
Output: ""
Explanation: There are no nice substrings.
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

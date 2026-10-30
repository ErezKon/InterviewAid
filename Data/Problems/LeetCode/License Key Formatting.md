# 482. License Key Formatting

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/license-key-formatting](https://leetcode.com/problems/license-key-formatting)
**Companies:** Google

---

## 1. Problem Description

You are given a license key represented as a string `s` that consists of only alphanumeric characters and dashes. The string is separated into `n + 1` groups by `n` dashes. You are also given an integer `k`.

We want to reformat the string `s` such that each group contains exactly `k` characters, except for the first group, which could be shorter than `k` but still must contain at least one character. Furthermore, there must be a dash inserted between two groups, and you should convert all lowercase letters to uppercase.

Return *the reformatted license key*.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of English letters, digits, and dashes `'-'`.
- `1 <= k <= 10^4`

---

## 2. Examples

**Example 1:**
```
Input: s = "5F3Z-2e-9-w", k = 4
Output: "5F3Z-2E9W"
Explanation: The string s has been split into two parts, each part has 4 characters.
Note that the two extra dashes are not needed and can be removed.
```

**Example 2:**
```
Input: s = "2-5g-3-J", k = 2
Output: "2-5G-3J"
Explanation: The string s has been split into three parts, each part has 2 characters except the first part as it could be shorter as mentioned above.
```

---

## 3. Approach: Reverse Build — O(n) ✅

```text
FUNCTION licenseKeyFormatting(s, k):
    // Remove dashes and convert to uppercase
    cleaned ← REPLACE(s, '-', '')
    cleaned ← UPPERCASE(cleaned)
    result ← []
    count ← 0
    // Build groups from the end
    FOR i ← LENGTH(cleaned) - 1 DOWNTO 0:
        APPEND cleaned[i] TO result
        count ← count + 1
        IF count = k AND i ≠ 0:
            APPEND '-' TO result
            count ← 0
    REVERSE result
    RETURN JOIN(result)
```

---

## 4. Walkthrough

Take `s = "5F3Z-2e-9-w"`, `k = 4`:
1. Remove dashes and uppercase → `cleaned = "5F3Z2E9W"`.
2. Iterate from the end, collecting characters:
   - Add `W`, `9`, `E`, `2` → group `2E9W` (4 chars), insert `-`.
   - Continue with `Z`, `3`, `F`, `5` → group `5F3Z`.
3. Reverse the accumulated list → `5F3Z-2E9W`.
4. Return the formatted string.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – single pass over the input | O(n) – to store the cleaned string and result |

---

## 6. Follow-Up Questions

* How would you handle Unicode characters or locale‑specific case conversion?
* Can the algorithm be adapted to format from the left instead of the right?
* What if the dash separator needed to be a different character based on locale?

---

## 7. Key Takeaway

> Strip dashes, uppercase, then build the result backwards in groups of `k`, inserting dashes as needed.

# 482. License Key Formatting

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/license-key-formatting](https://leetcode.com/problems/license-key-formatting)
**Companies:** Google

---

## 1. Problem Description

Reformat a license key string: remove dashes, uppercase, then group from right with groups of size `k`, separated by dashes.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"5F3Z-2e-9-w"`, `k = 4` | `"5F3Z-2E9W"` | Remove dashes → `5F3Z2E9W`. Group from right: `5F3Z` and `2E9W`. |
| `"2-5g-3-2"`, `k = 2` | `"2-5G-32"` | After cleaning: `25G32`. Groups: `2`, `5G`, `32` → `2-5G-32`. |

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

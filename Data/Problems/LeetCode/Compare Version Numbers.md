# 165. Compare Version Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/compare-version-numbers](https://leetcode.com/problems/compare-version-numbers)
**Companies:** Amazon, Apple, Google, Microsoft, Nextdoor, Nvidia, Sonatus, Tiktok, Vk, Zoho

---

## Problem Description
Given two version strings `version1` and `version2`, compare them. Each version consists of numeric revisions separated by dots `.`. Compare revision by revision as integers, ignoring leading zeros. Return `1` if `version1` > `version2`, `-1` if `version1` < `version2`, otherwise `0`.

## Examples
**Example 1**
```
Input: version1 = "1.01", version2 = "1.001"
Output: 0
Explanation: Both represent version 1.1 after ignoring leading zeros.
```
**Example 2**
```
Input: version1 = "1.0", version2 = "1.0.0"
Output: 0
Explanation: Trailing zeros are ignored.
```
**Example 3**
```
Input: version1 = "0.1", version2 = "1.1"
Output: -1
```

## Approach
Split both strings by `.` into arrays of revision numbers. Iterate up to the longer length, treating missing revisions as `0`. Compare integer values at each position.

### Pseudocode
```text
FUNCTION compareVersion(version1, version2):
    rev1 ← SPLIT(version1, '.')
    rev2 ← SPLIT(version2, '.')
    maxLen ← MAX(LENGTH(rev1), LENGTH(rev2))
    FOR i ← 0 TO maxLen - 1:
        n1 ← INTEGER(rev1[i]) IF i < LENGTH(rev1) ELSE 0
        n2 ← INTEGER(rev2[i]) IF i < LENGTH(rev2) ELSE 0
        IF n1 < n2: RETURN -1
        IF n1 > n2: RETURN 1
    RETURN 0
```

## Walkthrough
For `"1.0.1"` vs `"1"`:
- i=0: n1=1, n2=1 → continue
- i=1: n1=0, n2=0 (missing) → continue
- i=2: n1=1, n2=0 → return 1.

## Complexity Analysis
- **Time:** O(L) where L is the total number of revisions across both strings.
- **Space:** O(L) for the split arrays.

## Follow-Up Questions
1. How would you compare versions if revisions could be alphanumeric (e.g., `1.2a`)?
2. Can you perform the comparison without splitting the strings into arrays?
3. How would you handle extremely long version strings efficiently?

## Key Takeaway
Parsing versions into numeric components and comparing them position‑by‑position handles varying lengths and leading zeros elegantly.

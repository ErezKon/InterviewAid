# 165. Compare Version Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/compare-version-numbers](https://leetcode.com/problems/compare-version-numbers)
**Companies:** Amazon, Apple, Google, Microsoft, Nextdoor, Nvidia, Sonatus, Tiktok, Vk, Zoho

---

```
FUNCTION compareVersion(version1, version2):
    v1 = version1.SPLIT('.')
    v2 = version2.SPLIT('.')

    FOR i ← 0 TO MAX(len(v1), len(v2)) - 1:
        n1 = int(v1[i]) IF i < len(v1) ELSE 0
        n2 = int(v2[i]) IF i < len(v2) ELSE 0
        IF n1 < n2: RETURN -1
        IF n1 > n2: RETURN 1

    RETURN 0
```

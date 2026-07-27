# 2086. Minimum Number of Food Buckets to Feed the Hamsters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-food-buckets-to-feed-the-hamsters](https://leetcode.com/problems/minimum-number-of-food-buckets-to-feed-the-hamsters)
**Companies:** Geico, Grab, Microsoft, Palo Alto Networks

---

```
FUNCTION minimumBuckets(hamsters):
    s = list(hamsters)
    count = 0
    FOR i ← 0 TO len(s) - 1:
        IF s[i] == 'H':
            IF i > 0 AND s[i-1] == 'F': CONTINUE    // already fed
            IF i + 1 < len(s) AND s[i+1] == '.':
                s[i+1] = 'F'; count += 1    // prefer right
            ELSE IF i > 0 AND s[i-1] == '.':
                s[i-1] = 'F'; count += 1
            ELSE: RETURN -1
    RETURN count
```

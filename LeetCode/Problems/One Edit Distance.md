# 161. One Edit Distance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/one-edit-distance](https://leetcode.com/problems/one-edit-distance)
**Companies:** Apple, Google, Meta, Snapchat, Stripe, Twitter, Uber, Yandex

---

## Approach: Single Pass — O(n) ✅

```
FUNCTION isOneEditDistance(s, t):
    IF ABS(len(s) - len(t)) > 1: RETURN false
    IF len(s) > len(t): SWAP(s, t)    // ensure s is shorter

    FOR i ← 0 TO len(s) - 1:
        IF s[i] != t[i]:
            IF len(s) == len(t):
                RETURN s[i+1:] == t[i+1:]    // replace
            ELSE:
                RETURN s[i:] == t[i+1:]      // insert into s

    RETURN len(t) - len(s) == 1    // extra char at end
```

# 696. Count Binary Substrings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-binary-substrings](https://leetcode.com/problems/count-binary-substrings)
**Companies:** Amazon, Bloomberg, Blue Origin, De Shaw, Dell, Google, Helix, Ibm, Jpmorgan, Meesho, Meta, Microsoft, Oracle, Salesforce, Tiktok, Uber, Wells Fargo, Weride

---

## Approach: Group Counting — O(n) ✅

```
FUNCTION countBinarySubstrings(s):
    prev = 0, curr = 1, count = 0

    FOR i ← 1 TO len(s) - 1:
        IF s[i] == s[i-1]:
            curr += 1
        ELSE:
            count += MIN(prev, curr)
            prev = curr
            curr = 1

    count += MIN(prev, curr)
    RETURN count
```

Count consecutive groups. Adjacent groups of sizes a and b contribute min(a,b) valid substrings.

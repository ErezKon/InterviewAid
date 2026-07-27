# 1876. Substrings of Size Three with Distinct Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters](https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters)
**Companies:** Amazon, Bloomberg, Microsoft, Quora, Visa

---

```
FUNCTION countGoodSubstrings(s):
    count = 0
    FOR i ← 0 TO len(s) - 3:
        IF len(SET(s[i:i+3])) == 3: count += 1
    RETURN count
```

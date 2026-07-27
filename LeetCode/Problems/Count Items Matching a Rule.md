# 1773. Count Items Matching a Rule

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-items-matching-a-rule](https://leetcode.com/problems/count-items-matching-a-rule)
**Companies:** Amazon, Google, Meta

---

```
FUNCTION countMatches(items, ruleKey, ruleValue):
    idx = {"type": 0, "color": 1, "name": 2}[ruleKey]
    RETURN SUM(1 for item in items if item[idx] == ruleValue)
```

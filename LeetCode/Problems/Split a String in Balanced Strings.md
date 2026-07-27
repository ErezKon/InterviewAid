# 1221. Split a String in Balanced Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/split-a-string-in-balanced-strings](https://leetcode.com/problems/split-a-string-in-balanced-strings)
**Companies:** Amazon, Google, Meta, Salesforce

---

```
FUNCTION balancedStringSplit(s):
    count = 0; balance = 0
    FOR c IN s:
        balance += 1 IF c == 'L' ELSE -1
        IF balance == 0: count += 1
    RETURN count
```

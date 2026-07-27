# 859. Buddy Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/buddy-strings](https://leetcode.com/problems/buddy-strings)
**Companies:** Amazon, Doordash, Google, Meta, Zoho

---

```
FUNCTION buddyStrings(s, goal):
    IF len(s) != len(goal): RETURN false
    IF s == goal: RETURN len(s) != len(SET(s))    // need duplicate char
    diffs = [(a, b) for a, b in zip(s, goal) if a != b]
    RETURN len(diffs) == 2 AND diffs[0] == diffs[1][::-1]
```

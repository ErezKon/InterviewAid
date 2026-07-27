# 1593. Split a String Into the Max Number of Unique Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings](https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION maxUniqueSplit(s):
    maxCount = [0]

    FUNCTION backtrack(start, seen):
        IF start == len(s):
            maxCount[0] = MAX(maxCount[0], len(seen))
            RETURN
        FOR end ← start + 1 TO len(s):
            sub = s[start:end]
            IF sub NOT IN seen:
                seen.ADD(sub)
                backtrack(end, seen)
                seen.REMOVE(sub)

    backtrack(0, set())
    RETURN maxCount[0]
```

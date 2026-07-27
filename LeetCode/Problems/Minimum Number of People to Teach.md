# 1733. Minimum Number of People to Teach

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-people-to-teach](https://leetcode.com/problems/minimum-number-of-people-to-teach)
**Companies:** Amazon, Bloomberg, Duolingo, Google

---

```
FUNCTION minimumTeachings(n, languages, friendships):
    langs = [set(l) for l in languages]
    // Find friendships where they don't share a language
    needTeach = set()
    FOR [u, v] IN friendships:
        IF NOT langs[u-1] & langs[v-1]:
            needTeach.ADD(u); needTeach.ADD(v)

    // Try each language, count how many people in needTeach don't know it
    minTeach = len(needTeach)
    FOR lang ← 1 TO n:
        teach = SUM(1 for p in needTeach if lang NOT IN langs[p-1])
        minTeach = MIN(minTeach, teach)
    RETURN minTeach
```

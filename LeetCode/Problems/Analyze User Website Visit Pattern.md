# 1152. Analyze User Website Visit Pattern

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/analyze-user-website-visit-pattern](https://leetcode.com/problems/analyze-user-website-visit-pattern)
**Companies:** Amazon, Doordash, Google, Spotify, Uber, Whatnot

---

```
FUNCTION mostVisitedPattern(username, timestamp, website):
    // Group visits by user, sorted by time
    userVisits = defaultdict(list)
    FOR u, t, w IN sorted(zip(username, timestamp, website)):
        userVisits[u].ADD(w)

    // Count 3-sequences across users
    patternCount = Counter()
    FOR user, sites IN userVisits.items():
        // All 3-combinations (unique per user)
        patterns = SET(combinations(sites, 3))
        FOR p IN patterns:
            patternCount[p] += 1

    RETURN MAX(patternCount, key=lambda p: (patternCount[p], tuple(-ord(c) for c in ''.join(p))))
```

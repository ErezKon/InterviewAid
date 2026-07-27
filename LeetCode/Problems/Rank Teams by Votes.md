# 1366. Rank Teams by Votes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rank-teams-by-votes](https://leetcode.com/problems/rank-teams-by-votes)
**Companies:** Amazon, Atlassian, Bloomberg, Coursera, Google, Tekion, Ziprecruiter

---

```
FUNCTION rankTeams(votes):
    n = len(votes[0])
    count = {c: [0] * n for c in votes[0]}

    FOR vote IN votes:
        FOR i, c IN enumerate(vote):
            count[c][i] += 1

    RETURN JOIN(sorted(votes[0], key=lambda c: (count[c], -ord(c)), reverse=True))
```

Sort by vote counts at each position (descending), then alphabetically as tiebreaker.

# 789. Escape The Ghosts

**Difficulty:** 🟡 Medium

**Companies:** Google, Wix
---

```
FUNCTION escapeGhosts(ghosts, target):
    myDist = ABS(target[0]) + ABS(target[1])
    RETURN all(ABS(g[0]-target[0])+ABS(g[1]-target[1]) > myDist for g in ghosts)
```

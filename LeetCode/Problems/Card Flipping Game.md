# 822. Card Flipping Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/card-flipping-game](https://leetcode.com/problems/card-flipping-game)
**Companies:** Google

---

```
FUNCTION flipgame(fronts, backs):
    same = set()
    FOR f, b IN zip(fronts, backs):
        IF f == b: same.ADD(f)

    result = infinity
    FOR val IN fronts + backs:
        IF val NOT IN same:
            result = MIN(result, val)

    RETURN result IF result != infinity ELSE 0
```

A number is "bad" if it appears on both front and back of the same card. Find min non-bad number.

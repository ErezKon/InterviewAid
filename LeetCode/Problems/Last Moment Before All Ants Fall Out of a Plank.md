# 1503. Last Moment Before All Ants Fall Out of a Plank

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/last-moment-before-all-ants-fall-out-of-a-plank](https://leetcode.com/problems/last-moment-before-all-ants-fall-out-of-a-plank)
**Companies:** Google

---

## 1. Problem Description

Ants walk on a plank of length `n`. Ants going left/right at speed 1 collide and reverse. Return the last moment any ant is still on the plank.

---

## 2. Key Insight

Two ants colliding and reversing is identical to them passing through each other. So each ant independently reaches its nearest end.

---

## 3. Approach — O(n) ✅

```
FUNCTION getLastMoment(n, left, right):
    RETURN MAX(MAX(left) IF left ELSE 0, MAX(n - r for r in right) IF right ELSE 0)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 4. Key Takeaway

> Classic brain teaser: collisions = pass-through. The answer is simply max(distance to exit for each ant).

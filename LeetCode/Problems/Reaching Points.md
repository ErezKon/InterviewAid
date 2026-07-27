# 780. Reaching Points

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/reaching-points](https://leetcode.com/problems/reaching-points)
**Companies:** Amazon, Blackstone, Cloudflare, Coursera, Goldman Sachs, Google, Jpmorgan, Kla, Kla Tencor, Microsoft, Paypal, Snapchat, Wayfair

---

## Approach: Work Backwards with Modulo — O(log(max(tx,ty))) ✅

```
FUNCTION reachingPoints(sx, sy, tx, ty):
    WHILE tx > sx AND ty > sy:
        IF tx > ty:
            tx %= ty
        ELSE:
            ty %= tx

    IF tx == sx AND ty == sy: RETURN true
    IF tx == sx: RETURN ty > sy AND (ty - sy) % tx == 0
    IF ty == sy: RETURN tx > sx AND (tx - sx) % ty == 0
    RETURN false
```

Forward: `(x,y) → (x+y, y)` or `(x, x+y)`. Backward: subtract the smaller from the larger. Use modulo to skip repeated subtractions.

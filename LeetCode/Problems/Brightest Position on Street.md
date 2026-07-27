# 2021. Brightest Position on Street

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/brightest-position-on-street](https://leetcode.com/problems/brightest-position-on-street)
**Companies:** Capital One, Robinhood, Roblox, Tiktok, Uber, Visa

---

## Approach: Line Sweep — O(n log n) ✅

```
FUNCTION brightestPosition(lights):
    events = []
    FOR [pos, rng] IN lights:
        events.ADD((pos - rng, 1))
        events.ADD((pos + rng + 1, -1))

    SORT events
    maxBright = 0; current = 0; result = 0

    FOR (pos, delta) IN events:
        current += delta
        IF current > maxBright:
            maxBright = current
            result = pos

    RETURN result
```

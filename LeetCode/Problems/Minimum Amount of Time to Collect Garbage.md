# 2391. Minimum Amount of Time to Collect Garbage

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Microsoft
---

## Key Insight

> Each truck (G, M, P) independently travels to the **last house** containing its garbage type. Total time = picking up all garbage (one unit per character) + travel time for each truck to its last stop.

---

## Approach: Per-truck Last Stop — O(n·L) ✅

```
FUNCTION garbageCollection(garbage, travel):
    time ← 0
    FOR truck IN ['G', 'M', 'P'] DO
        lastIdx ← 0
        FOR i, g IN ENUMERATE(garbage) DO
            count ← g.COUNT(truck)
            IF count > 0 THEN
                time ← time + count
                lastIdx ← i
        time ← time + SUM(travel[0..lastIdx-1])
    RETURN time
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Per-truck scan | **O(n · L)** | **O(1)** |

Where L is the average string length at each house.

---

## Key Takeaway

> **Independent truck simulation** — each truck picks up all its garbage (1 unit/char) and travels to its last required house. Sum travel via prefix sums for efficiency.

---

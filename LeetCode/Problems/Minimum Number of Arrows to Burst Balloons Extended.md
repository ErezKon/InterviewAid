# Greedy Interval Selection Patterns

Related: #435, #452, #646, #1024

---

## Activity Selection / Interval Scheduling

Sort by **end time**, greedily pick non-overlapping:

```
FUNCTION maxNonOverlapping(intervals):
    SORT by end time
    count = 0
    lastEnd = -infinity
    FOR [start, end] IN intervals:
        IF start >= lastEnd:
            count += 1
            lastEnd = end
    RETURN count
```

| Problem | Sort By | Greedy Rule |
|---------|---------|------------|
| Non-overlapping Intervals (#435) | End | Keep earliest-ending, count removed |
| Min Arrows (#452) | End | New arrow when start > lastEnd |
| Max Chain Length (#646) | Second element | Same as activity selection |
| Video Stitching (#1024) | Start | Jump Game II pattern |

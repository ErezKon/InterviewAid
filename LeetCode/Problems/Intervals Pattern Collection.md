# Interval Problem Collection

Related: #56, #57, #253, #435, #452, #763, #986, #1288

---

## Interval Taxonomy

| Pattern | Problems |
|---------|---------|
| **Merge** | #56 Merge Intervals |
| **Insert** | #57 Insert Interval |
| **Count overlaps** | #253 Meeting Rooms II (line sweep) |
| **Remove overlaps** | #435 Non-overlapping Intervals (greedy) |
| **Intersect** | #986 Interval List Intersections |
| **Cover/pierce** | #452 Min Arrows, #1326 Min Taps |
| **Partition** | #763 Partition Labels |

### Key Sorting Strategies

| Sort By | When |
|---------|------|
| Start time | Merging, inserting |
| End time | Greedy selection (min rooms, max non-overlapping) |
| Both (line sweep) | Counting concurrent events |

### Line Sweep Template

```
events = []
FOR [start, end] IN intervals:
    events.ADD((start, +1))
    events.ADD((end, -1))
SORT events
```

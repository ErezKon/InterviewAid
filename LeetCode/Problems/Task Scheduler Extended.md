# Greedy Scheduling Patterns

Related: #621, #358, #767, #1405

---

## Cooldown/Spacing Pattern

| Problem | Constraint | Approach |
|---------|-----------|----------|
| Task Scheduler (#621) | Cooldown n between same tasks | Math: `(maxFreq-1)*(n+1) + countMax` |
| Rearrange String (#358) | No adjacent same chars | Max-heap + cooldown queue |
| Reorganize String (#767) | No adjacent same chars | Max-heap, delay 1 step |
| Longest Happy String (#1405) | No 3 consecutive same | Max-heap, check last 2 |

### Task Scheduler Formula

```
Answer = MAX(len(tasks), (maxFreq - 1) * (n + 1) + countOfMaxFreq)
```

Where `countOfMaxFreq` = number of tasks with maximum frequency. The formula creates "frames" of size `n+1` with the most frequent task at the start of each frame.

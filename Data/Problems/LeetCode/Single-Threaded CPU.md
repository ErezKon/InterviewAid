# 1834. Single-Threaded CPU

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/single-threaded-cpu](https://leetcode.com/problems/single-threaded-cpu)
**Companies:** Amazon, Doordash, Goldman Sachs, Google, Ibm, Meta, Microsoft

---

## Problem Description

You have a single-threaded CPU that processes tasks one at a time. Given `tasks[i] = [enqueueTime, processingTime]`, the CPU picks the available task with the **shortest processing time** (ties broken by smallest index).

Return the order in which the CPU processes the tasks.

### Examples

**Example 1:**
- **Input:** `tasks = [[1,2],[2,4],[3,2],[4,1]]`
- **Output:** `[0,2,3,1]`
- **Explanation:** At time 1, task 0 starts. At time 3, tasks 1,2 available → pick task 2 (shorter). At time 5, tasks 1,3 available → pick task 3. At time 6, task 1 runs.

**Example 2:**
- **Input:** `tasks = [[7,10],[7,12],[7,5],[7,4],[7,2]]`
- **Output:** `[4,3,2,0,1]`

### Constraints

- `1 <= tasks.length <= 10⁵`
- `1 <= enqueueTimei, processingTimei <= 10⁹`

---

## Approach: Sort + Min-Heap — O(n log n) ✅

Sort tasks by enqueue time. Use a min-heap keyed by `(processingTime, originalIndex)` to always pick the shortest available task.

```
FUNCTION getOrder(tasks):
    indexed = [(enqueue, process, i) for i, [enqueue, process] in enumerate(tasks)]
    SORT indexed by enqueue time

    heap = MinHeap()    // (processingTime, index)
    result = []
    time = 0
    idx = 0

    WHILE idx < n OR heap:
        IF heap is empty AND idx < n AND time < indexed[idx][0]:
            time = indexed[idx][0]

        WHILE idx < n AND indexed[idx][0] <= time:
            heap.PUSH((indexed[idx][1], indexed[idx][2]))
            idx += 1

        (procTime, taskIdx) = heap.POP()
        result.ADD(taskIdx)
        time += procTime

    RETURN result
```

### Walkthrough — `tasks = [[1,2],[2,4],[3,2],[4,1]]`

| time | available in heap | pick (shortest) | result |
|------|-------------------|-----------------|--------|
| 1    | {(2,0)}           | task 0 (proc=2) | [0]    |
| 3    | {(4,1),(2,2)}     | task 2 (proc=2) | [0,2]  |
| 5    | {(4,1),(1,3)}     | task 3 (proc=1) | [0,2,3]|
| 6    | {(4,1)}           | task 1 (proc=4) | [0,2,3,1]|

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

# Greedy Scheduling Patterns

Related: #621, #358, #767, #1405
---

## Problem Description
This article collects a family of greedy scheduling problems that share a common *cool‑down* or *spacing* constraint. The goal in each problem is to arrange tasks (or characters) so that certain patterns are avoided, typically by ensuring a minimum distance between identical items.

## Examples
**Example 1 – Task Scheduler (#621):**
```
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: One possible order is A B idle A B idle A B.
```
**Example 2 – Rearrange String (#358):**
```
Input: s = "aaabc"
Output: "abaca"
Explanation: No two adjacent characters are the same.
```
**Example 3 – Longest Happy String (#1405):**
```
Input: a = 1, b = 1, c = 7
Output: "ccccccc"
Explanation: The string contains at most two consecutive identical characters.
```

## Approach
All these problems can be tackled with a *greedy* strategy that always places the most frequent remaining item while respecting the spacing rule. The typical implementation uses a max‑heap (priority queue) to retrieve the item with highest remaining count, and a temporary cooldown queue to hold items that cannot be used until the required distance passes.

```text
FUNCTION schedule(tasks, n):
    // Count frequencies
    freqMap ← COUNTER(tasks)
    // Build max‑heap of (count, item)
    heap ← MaxHeap()
    FOR each item, cnt IN freqMap:
        heap.PUSH((cnt, item))
    time ← 0
    cooldown ← QUEUE()   // stores (availableTime, (cnt, item))
    WHILE heap NOT EMPTY OR cooldown NOT EMPTY:
        // Release items whose cooldown expired
        IF cooldown NOT EMPTY AND cooldown.FRONT().availableTime == time:
            heap.PUSH(cooldown.DEQUEUE().item)
        IF heap NOT EMPTY:
            cnt, item ← heap.POP()
            // Execute task
            cnt ← cnt - 1
            IF cnt > 0:
                // Put back after n+1 steps
                cooldown.ENQUEUE((time + n + 1, (cnt, item)))
        time ← time + 1
    RETURN time
```
For the pure *formula* version of Task Scheduler, the answer can be computed directly as:
```
Answer = MAX(len(tasks), (maxFreq - 1) * (n + 1) + countMaxFreq)
```
where `maxFreq` is the highest task frequency and `countMaxFreq` is the number of tasks that achieve this frequency.

## Walkthrough
Consider `tasks = [A,A,A,B,B,B]` with `n = 2`.
| Time | Executed | Heap (cnt,item) | Cooldown queue |
|------|----------|-----------------|----------------|
| 0 | A | (3,B) | [(3, (2,A))] |
| 1 | B | (2,A) | [(4, (2,B))] |
| 2 | idle | (2,A) | [(5, (1,A)), (5, (1,B))] |
| 3 | A | (1,B) | [(6, (1,A))] |
| 4 | B | empty | [(7, (0,B))] |
| 5 | A | empty | [] |
Resulting schedule length = 8.

## Complexity Analysis
- Time: O(T log U) where T is the total number of tasks (or characters) and U is the number of distinct items, due to heap operations.
- Space: O(U) for the heap and cooldown queue.

## Follow‑Up Questions
1. How would you adapt the algorithm if the cooldown period varies per task type?
2. Can the Task Scheduler formula be derived using a counting argument without simulation?
3. What changes are needed to handle weighted tasks where each execution has a different cost?

## Key Takeaway
A max‑heap combined with a cooldown queue yields a simple greedy framework that solves many spacing‑constraint scheduling problems efficiently.

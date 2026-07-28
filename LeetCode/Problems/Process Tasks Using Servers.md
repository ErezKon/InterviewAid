# 1882. Process Tasks Using Servers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/process-tasks-using-servers](https://leetcode.com/problems/process-tasks-using-servers)
**Companies:** Amazon, Google, Linkedin, Tiktok, Twitter

---

## Problem Description
You are given two arrays: `servers`, where `servers[i]` is the weight of the i‑th server, and `tasks`, where `tasks[j]` is the processing time of the j‑th task arriving at second `j`. At each second, assign the arriving task to the available server with the smallest weight (and smallest index if tied). If no server is free, wait until the earliest server becomes available. Return an array `result` where `result[j]` is the index of the server that processes task `j`.

## Examples
**Example 1:**
```
servers = [3,3,2]
tasks   = [1,2,3,2,1,2]
output  = [2,2,0,2,1,2]
```
*Explanation:* At second 0, server 2 (weight 2) processes task 0. At second 1, server 2 is still busy, so server 0 (weight 3) processes task 1, etc.

**Example 2:**
```
servers = [5,1,4,3,2]
tasks   = [2,1,2,4,5,2,1]
output  = [1,4,1,4,1,3,2]
```
*Explanation:* The lightest free server is chosen each second; when all are busy, the task waits for the earliest free server.

## Approach
We maintain two min‑heaps:
1. **available** – `(weight, index)` of free servers.
2. **busy** – `(freeTime, weight, index)` of servers currently processing a task.
For each second `t` (task index), we first move any servers whose `freeTime ≤ t` from `busy` back to `available`. If `available` is non‑empty we pop the smallest server, assign the task, and push it into `busy` with `freeTime = t + tasks[t]`. If no server is free, we pop the earliest finishing server from `busy`, assign the task at its `freeTime`, and push it back with an updated `freeTime`.

```text
FUNCTION assignTasks(servers, tasks):
    available ← MinHeap([(w, i) FOR i, w IN ENUMERATE(servers)])
    busy ← MinHeap()               // (freeTime, weight, index)
    result ← []
    FOR t, task IN ENUMERATE(tasks):
        // release servers that finished by time t
        WHILE busy NOT EMPTY AND busy.PEEK()[0] ≤ t:
            (_, w, idx) ← busy.POP()
            available.PUSH((w, idx))
        IF available NOT EMPTY:
            (w, idx) ← available.POP()
            result.APPEND(idx)
            busy.PUSH((t + task, w, idx))
        ELSE:
            (freeTime, w, idx) ← busy.POP()
            result.APPEND(idx)
            busy.PUSH((freeTime + task, w, idx))
    RETURN result
```

## Walkthrough
| Time | Task | Available Servers (weight,index) | Busy Servers (freeTime,weight,index) | Assigned Server |
|------|------|----------------------------------|--------------------------------------|-----------------|
| 0    | 1    | (2,2),(3,0),(3,1)                | –                                    | 2               |
| 1    | 2    | (3,0),(3,1)                      | (1,2,2)                              | 0               |
| 2    | 3    | (3,1)                            | (1,2,2),(3,0,0)                      | 1               |
| …    | …    | …                                | …                                    | …               |

## Complexity Analysis
- **Time:** Each server is pushed/popped from a heap at most once per task → `O(n log k)`, where `n = len(tasks)` and `k = len(servers)`.
- **Space:** Two heaps store at most `k` servers → `O(k)`.

## Follow-Up Questions
1. How would the solution change if tasks could arrive at arbitrary timestamps instead of one per second?
2. Can the algorithm be adapted to prioritize servers based on a custom ranking function?
3. What modifications are needed to return the exact start time of each task?

## Key Takeaway
Using two priority queues—one for free servers and one for busy servers—allows us to always pick the lightest available server in logarithmic time, handling both immediate assignments and waiting efficiently.

# 1882. Process Tasks Using Servers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/process-tasks-using-servers](https://leetcode.com/problems/process-tasks-using-servers)
**Companies:** Amazon, Google, Linkedin, Tiktok, Twitter

---

## Approach: Two Heaps — O(n log k) ✅

```
FUNCTION assignTasks(servers, tasks):
    available = MinHeap([(w, i) for i, w in enumerate(servers)])
    busy = MinHeap()    // (freeTime, weight, index)
    result = []

    FOR t, task IN enumerate(tasks):
        // Free up servers that finished by time t
        WHILE busy AND busy[0][0] <= t:
            (_, w, idx) = busy.POP()
            available.PUSH((w, idx))

        IF available:
            (w, idx) = available.POP()
            result.ADD(idx)
            busy.PUSH((t + task, w, idx))
        ELSE:
            // Wait for next server to free up
            (freeTime, w, idx) = busy.POP()
            result.ADD(idx)
            busy.PUSH((freeTime + task, w, idx))

    RETURN result
```

# 1942. The Number of the Smallest Unoccupied Chair

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair](https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Spinny

---

```
FUNCTION smallestChair(times, targetFriend):
    events = []
    FOR i, [arrive, leave] IN enumerate(times):
        events.ADD((arrive, 0, i))    // arrive
        events.ADD((leave, 1, i))     // leave
    SORT events

    available = MinHeap(range(len(times)))
    assigned = {}

    FOR (time, type, friend) IN events:
        IF type == 1:    // leave
            available.PUSH(assigned[friend])
        ELSE:            // arrive
            chair = available.POP()
            assigned[friend] = chair
            IF friend == targetFriend: RETURN chair
```

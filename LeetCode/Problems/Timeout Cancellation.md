# 2715. Timeout Cancellation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/timeout-cancellation](https://leetcode.com/problems/timeout-cancellation)
**Companies:** Google, Meta

---

## Problem Description
Given a function that performs an asynchronous operation, implement a wrapper that cancels the operation if it does not complete within a given time limit. Return a default value or error when the timeout occurs.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| operation takes 5 s, timeout = 3 s | timeout error | The wrapper aborts after 3 s. |
| operation takes 2 s, timeout = 3 s | operation result | The operation finishes before the timeout.

## Approach
Use a timer that triggers after the timeout duration. Run the original operation in a separate task. Whichever finishes first— the operation or the timer— determines the result.

```text
FUNCTION RunWithTimeout(operation, timeout):
    CREATE channel resultChannel
    START ASYNC:
        SET res ← operation()
        SEND res TO resultChannel
    END ASYNC
    START TIMER FOR timeout MILLISECONDS
    WAIT UNTIL resultChannel OR TIMER fires:
        IF resultChannel RECEIVED:
            RETURN received value
        ELSE:
            RETURN timeout error
```

## Walkthrough
Consider an operation that sleeps for 5 s with a timeout of 3 s.
1. The async task starts and will send its result after 5 s.
2. The timer is set for 3 s.
3. After 3 s the timer fires first, so the function returns a timeout error and discards the later result.

## Complexity Analysis
Time: O(t) where *t* is the smaller of the operation duration and the timeout. Space: O(1) additional memory.

## Follow-Up Questions
* How would you support cancellation of the underlying operation to free resources?
* How can you extend this pattern to handle multiple concurrent operations with a shared timeout?
* What changes are needed for a deterministic timeout in a distributed system?

## Key Takeaway
A timeout wrapper runs the target operation and a timer in parallel, returning whichever finishes first, which cleanly isolates long‑running tasks.

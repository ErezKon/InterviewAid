# 1117. Building H2O

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/building-h2o](https://leetcode.com/problems/building-h2o)
**Companies:** Google, Linkedin, Tesla

---

```
CLASS H2O:
    // Use semaphores: hSem = Semaphore(2), oSem = Semaphore(0)
    // barrier = Barrier(3, action=reset semaphores)
    FUNCTION hydrogen():
        hSem.acquire(); releaseHydrogen()
        barrier.wait()

    FUNCTION oxygen():
        oSem.acquire(); releaseOxygen()
        barrier.wait()
```

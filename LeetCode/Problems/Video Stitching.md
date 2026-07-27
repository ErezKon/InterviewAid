# 1024. Video Stitching

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/video-stitching](https://leetcode.com/problems/video-stitching)
**Companies:** Anduril, Google, Verily

---

```
FUNCTION videoStitching(clips, time):
    SORT clips
    count = 0; end = 0; farthest = 0; i = 0
    WHILE end < time:
        WHILE i < len(clips) AND clips[i][0] <= end:
            farthest = MAX(farthest, clips[i][1])
            i += 1
        IF farthest == end: RETURN -1
        end = farthest; count += 1
    RETURN count
```

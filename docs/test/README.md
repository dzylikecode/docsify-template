# test

## mermaid

```mermaid
flowchart LR
    id1(Start)-->id2(Stop)
    style id1 fill:#f9f,stroke:#333,stroke-width:4px
    style id2 fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
```

```mermaid
flowchart LR
  subgraph TOP
    direction TB
    subgraph B1
        direction RL
        i1 -->f1
    end
    subgraph B2
        direction BT
        i2 -->f2
    end
  end
  A --> TOP --> B
  B1 --> B2
```

## js to flowchart

[](flowchart.js ":include :type=code js2flowchart")

## katex

```txt
$$E = mc^2$$
```

$$E = mc^2$$

## hightligt text

```txt
==high==
```

==high==

你好啊, ==yong580==, but not to ==this==

## reference link

```txt
This is a quote from Donald Duck literature[^duck]. But python doesn't think so[^python].

1. [-duck] life is too short, I use python
1. [-python] why cue me?
```

This is a quote from Donald Duck literature[^duck]. But python doesn't think so[^python].

1. [-duck] life is too short, I use python
1. [-python] why cue me?

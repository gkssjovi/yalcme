## Yalcme

### Description

Yalc publish and yalc update the easy way.

### Install

```
yarn build:install
```

### Usage

```
yalcme
```

### Confiruration Example

```json
{
  "source": [
    "/Users/user/path/to/source/repo/1",
    {
      "path": "/Users/user/path/to/source/repo/2",
      "beforePublish": "npm run build"
    }
  ],
  "target": [
    "/Users/user/path/to/target/repo/1",
    "/Users/user/path/to/target/repo/2"
  ]
}
```
import { theme } from "./theme"

interface Layout {
  background: {
    bg: string
    shadow: string
  }
  menu: {
    bg: string
  }
  container: {
    hover: string
    bg: string
    shadow: {
      background: string
      container: string
    }
  }
  hint: {
    color: string
    bg: string
    shadow: {
      background: string
      container: string
    },
  }
  input: {
    label: string
    placeholder: string
    color: string
    bg: string
    shadow: {
      background: string
      container: string
    }
  }
  radio: {
    selected: {
      bg: string
      color: string
      circleBg: string
      shadow: {
        background: string
        container: string
      }
    },
    unSelected: {
      bg: string
      color: string
      circleBg: string
      shadow: {
        background: string
        container: string
      }
    },
  },
  table: {
    shadow: string
    borders: string
    thead: {
      shadow: string
      bg: string
      color: string
    }
    tbody: {
      hover: string
      bg: string
      color: string
    }
  }
  button: {
    add: {
      color: string
      shadow: string
      bg: {
        primary: string
        secondary: string
      }
    },
    edit: {
      color: string
      shadow: string
      bg: {
        primary: string
        secondary: string
      }
    },
    delete: {
      color: string
      shadow: string
      bg: {
        primary: string
        secondary: string
      }
    },
    default: {
      color: string
      shadow: string
      bg: {
        primary: string
        secondary: string
      }
    }
    icon: {
      color: string
      shadow: string
      bg: {
        primary: string
        secondary: string
      }
    }
    cancel: {
      shadow: string
      color: string
      bg: {
        primary: string
        secondary: string
      }
    }
    // attention: {
    //   shadow: string
    //   bg: {
    //     primary: string
    //     secondary: string
    //   }
    // }
  }
}

// light
// export const palette = {
//   primaryLight: "#51af72",
//   primaryMain: "hsl(162, 70%, 34%)",
//   primaryDark: "#237c62",
//   text: {
//     insignificant: "#999999",
//     normal: "#707070",
//     accent: "#000000",
//     success: "#5cb85c",
//     warn: "#ffbb33",
//     error: "#ff4444",
//   },
// }

export const palette = {
  primaryLight: "#51af72",
  primaryMain: "hsl(162, 70%, 34%)",
  primaryDark: "#237c62",
  text: {
    insignificant: "#999999",
    normal: "#707070",
    accent: "#000000",
    success: "#5cb85c",
    warn: "#ffbb33",
    error: "#ff4444",
  },
}

export const dark: Layout = {
  background: {
    bg: "#f8f8f8",
    shadow: "",
  },

  menu: {
    bg: 'white'
  },

  container: {
    hover: "white",
    bg: "white",
    shadow: {
      // na co pada cien
      background: "0px 5px 35px 0px rgba(0,0,0,0.125)",
      container: "0px 5px 35px 0px rgba(0,0,0,0.185)",
    },
  },

  hint: {
    color: 'black',
    bg: 'rgba( 255, 255, 255, 0.55)',
    shadow: {
      background: "0px 3px 15px -2px rgba(0, 0, 0, 0.1375)",
      container: "0px 3px 15px -2px rgba(0, 0, 0, 0.1275)",
    },
  },

  input: {
    label: palette.text.accent,
    placeholder: "#999",
    color: palette.text.accent,
    bg: "#fff",
    shadow: {
      background: "0px 3px 15px -2px rgba(0, 0, 0, 0.1375)",
      container: "0px 3px 15px -2px rgba(0, 0, 0, 0.1275)",
    },
  },

  radio: {
    selected: {
      bg: 'rgba( 255, 255, 255, 0.75)',
      color: 'black',
      circleBg: palette.primaryMain,
      shadow: {
        background: '0px 3px 15px -2px rgba(0, 0, 0, 0.1375)',
        container: '0px 3px 15px -2px rgba(0, 0, 0, 0.1275)'
      }
    },
    unSelected: {
      bg: '#eee',
      circleBg: 'gray',
      color: 'black',
      shadow: {
        background: '0px 3px 15px -2px rgba(0, 0, 0, 0.1375)',
        container: '0px 3px 15px -2px rgba(0, 0, 0, 0.1275)'
      }
    },
  },

  table: {
    shadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.17)',
    borders: 'rgba( 255, 255, 255, 0.25)',
    thead: {
      shadow: '',
      bg: 'rgba( 255, 255, 255, 0.25)',
      color: palette.text.accent,
    },
    tbody: {
      hover: 'rgba( 255, 255, 255, 0.4)',
      bg: 'rgba( 255, 255, 255, 0.35)',
      color: palette.text.normal,
    },
  },

  button: {
    add: {
      color: '#ffffff',
      shadow: `0px 0px 25px -5px #2a9d8f`,
      bg: {
        primary: '#22bf79',
        secondary: '#264653',
      },
    },
    edit: {
      color: '#ffffff',
      shadow: `0px 0px 25px -5px #fccd49`,
      bg: {
        primary: '#fccd49',
        secondary: '#c4272a',
      },
    },
    delete: {
      color: '#ffffff',
      shadow: `0px 0px 25px -5px #ff0054`,
      bg: {
        primary: '#ff0054',
        secondary: '#7a0d6b',
      },
    },
    default: {
      color: '#ffffff',
      shadow: `0px 0px 25px -5px ${palette.primaryMain}`,
      bg: {
        primary: palette.primaryLight,
        secondary: palette.primaryDark,
      },
    },
    icon: {
      color: palette.text.accent,
      shadow: '0px 0px 20px 0px rgba(0,0,0,0.325)',
      bg: {
        primary: palette.primaryLight,
        secondary: palette.primaryDark,
      },
    },
    cancel: {
      shadow: '0px 5px 25px -5px #666',
      color: '#ffffff',
      bg: {
        primary: '#999999',
        secondary: '#222',
      },
    },
    // attention: {
    //   shadow: ',
    //   bg: {
    //     primary: ',
    //     secondary: "",
    //   },
    // },
  },
}

export const colors = {
  ...palette,
  ...dark,
}

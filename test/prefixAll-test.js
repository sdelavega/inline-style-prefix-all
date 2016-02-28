import { expect } from 'chai'
import prefixAll from '../modules/prefixAll'


describe('Prefixing all properties', () => {
  it('should only add prefixes if browsers need it', () => {
    const input = { transition: '200ms all linear' }
    const output = {
      WebkitTransition: '200ms all linear',
      transition: '200ms all linear'
    }
    expect(prefixAll(input)).to.eql(output)
  })

  it('should add all prefixes', () => {
    const input = { userSelect: 'none' }
    const output = {
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none'
    }
    expect(prefixAll(input)).to.eql(output)
  })

  it('should also resolve nested objects', () => {
    const input = {
      transition: '200ms all linear',
      innerStyles: {
        transition: '300ms all ease-in'
      }
    }
    const output = {
      WebkitTransition: '200ms all linear',
      transition: '200ms all linear',
      innerStyles: {
        WebkitTransition: '300ms all ease-in',
        transition: '300ms all ease-in'
      }
    }
    expect(prefixAll(input)).to.eql(output)
  })
})

describe('Resolving special plugins', () => {
  it('should prefix calc expressions', () => {
    const input = { width: 'calc(30px)' }
    const output = {
      width: '-webkit-calc(30px);width:-moz-calc(30px);width:calc(30px)'
    }
    expect(prefixAll(input)).to.eql(output)
  })

  it('should prefix special cursor values', () => {
    const input = { cursor: 'zoom-in' }
    const output = {
      cursor: '-webkit-zoom-in;cursor:-moz-zoom-in;cursor:zoom-in'
    }
    expect(prefixAll(input)).to.eql(output)
  })

  it('should resolve flex-direction for all flexbox specification', () => {
    const input = { flexDirection: 'column-reverse' }
    const output = {
      WebkitBoxOrient: 'vertical',
      WebkitBoxDirection: 'reverse',
      WebkitFlexDirection: 'column-reverse',
      msFlexDirection: 'column-reverse',
      flexDirection: 'column-reverse'
    }
    expect(prefixAll(input)).to.eql(output)
  })

  it('should resolve alternative values for all flexbox specification', () => {
    const input = { justifyContent: 'space-around' }
    const output = {
      WebkitBoxPack: 'justify',
      WebkitJustifyContent: 'space-around',
      msJustifyContent: 'space-around',
      justifyContent: 'space-around',
      msFlexPack: 'distribute'
    }
    expect(prefixAll(input)).to.eql(output)
  })

  it('should resolve flexbox variants', () => {
    const input = {
      alignItems: 'center',
      height: '100px',
      width: '200px'
    }
    const output = {
      WebkitAlignItems: 'center',
      WebkitBoxAlign: 'center',
      msAlignItems: 'center',
      msFlexAlign: 'center',
      alignItems: 'center',
      height: '100px',
      width: '200px'
    }
    expect(prefixAll(input)).to.eql(output)
  })

  it('should prefix gradients', () => {
    const input = {
      background: 'linear-gradient(to bottom right, red, yellow)'
    }
    const output = {
      background: '-webkit-linear-gradient(to bottom right, red, yellow);background:-moz-linear-gradient(to bottom right, red, yellow);background:linear-gradient(to bottom right, red, yellow)'
    }
    expect(prefixAll(input)).to.eql(output)
  })

  it('should add all flexbox display types', () => {
    const input = { display: 'flex' }
    const output = {
      display: '-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex'
    }
    expect(prefixAll(input)).to.eql(output)
  })

  it('should add all inline flexbox display types', () => {
    const input = { display: 'inline-flex' }
    const output = {
      display: '-webkit-box;display:-moz-box;display:-ms-inline-flexbox;display:-webkit-inline-flex;display:inline-flex'
    }
    expect(prefixAll(input)).to.eql(output)

  })

  it('should prefix special sizing values', () => {
    const input = { width: 'min-content' }
    const output = {
      width: '-webkit-min-content;width:-moz-min-content;width:min-content'
    }
    expect(prefixAll(input)).to.eql(output)
  })

  it('should prefix every property within transition values', () => {
    const input = {
      transition: '200ms linear appearance, 100ms linear width'
    }
    const output = {
      WebkitTransition: '200ms linear -moz-appearance,200ms linear -webkit-appearance,200ms linear appearance, 100ms linear width',
      transition: '200ms linear -moz-appearance,200ms linear -webkit-appearance,200ms linear appearance, 100ms linear width'
    }
    expect(prefixAll(input)).to.eql(output)
  })
})

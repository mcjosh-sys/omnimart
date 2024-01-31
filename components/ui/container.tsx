interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return (
      <div className='flex justify-center w-full'>
          <div className='space-y-4 pt-6 w-full max-w-6xl mx-8'>
              {children}
          </div>
      </div>
  )
}

export default Container
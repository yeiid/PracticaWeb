import React from 'react';
import CourseTitle from './CourseTitle';
import CourseNavigation from './CourseNavigation';

const CourseHeader = (props) => {
  const { 
    title, 
    currentSlide, 
    totalSlides, 
    onPrev, 
    onNext, 
    onSlideSelect,
    showNavigation = true,
    navigationPosition = 'top' // 'top' o 'bottom'
  } = props;

  return (
    <>
      {navigationPosition === 'top' && showNavigation && (
        <CourseNavigation 
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onPrev={onPrev}
          onNext={onNext}
          onSlideSelect={onSlideSelect}
        />
      )}
      
      <CourseTitle 
        title={title}
        currentSlide={currentSlide}
        totalSlides={totalSlides}
      />
      
      {navigationPosition === 'bottom' && showNavigation && (
        <CourseNavigation 
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onPrev={onPrev}
          onNext={onNext}
          onSlideSelect={onSlideSelect}
          className="bottomNavigation"
        />
      )}
    </>
  );
};

export default CourseHeader;